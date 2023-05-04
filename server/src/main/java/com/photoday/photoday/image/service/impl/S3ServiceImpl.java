package com.photoday.photoday.image.service.impl;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.photoday.photoday.image.service.S3Service;
import com.photoday.photoday.image.util.ImageUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import marvin.image.MarvinImage;
import org.marvinproject.image.transform.scale.Scale;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.xml.bind.DatatypeConverter;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3ServiceImpl implements S3Service {
    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String s3Bucket;

    @Override
    public String saveImage(MultipartFile multipartFile) throws IOException {
        String originalFilename = multipartFile.getOriginalFilename();
        long size = multipartFile.getSize();

        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentType(multipartFile.getContentType());
        objectMetadata.setContentLength(size);

        amazonS3Client.putObject(
                new PutObjectRequest(s3Bucket, originalFilename, multipartFile.getInputStream(), objectMetadata)
        );

        return amazonS3Client.getUrl(s3Bucket, originalFilename).toString();
    }

    @Override
    public String resizeImage(MultipartFile multipartFile, int targetWidth) throws IOException {
            // MultipartFile -> BufferedImage Convert
            BufferedImage image = ImageIO.read(multipartFile.getInputStream());
            // newWidth : newHeight = originWidth : originHeight
            int originWidth = image.getWidth();
            int originHeight = image.getHeight();

            // origin 이미지가 resizing될 사이즈보다 작을 경우 resizing 작업 안 함
            if(originWidth < targetWidth) return null;

            MarvinImage imageMarvin = new MarvinImage(image);

            Scale scale = new Scale();
            scale.load();
            scale.setAttribute("newWidth", targetWidth);
            scale.setAttribute("newHeight", targetWidth * originHeight / originWidth);
            scale.process(imageMarvin.clone(), imageMarvin, null, null, false);

            BufferedImage imageNoAlpha = imageMarvin.getBufferedImageNoAlpha();
            ByteArrayOutputStream baos = new ByteArrayOutputStream();

            String fileFormat = multipartFile.getContentType().substring(multipartFile.getContentType().lastIndexOf("/") + 1);
            ImageIO.write(imageNoAlpha, fileFormat, baos);
            baos.flush();

            String resizedImageFilename = "s_"+multipartFile.getOriginalFilename();

            MockMultipartFile mockMultipartFile = new MockMultipartFile(resizedImageFilename, baos.toByteArray());
            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentType(mockMultipartFile.getContentType());
            objectMetadata.setContentLength(mockMultipartFile.getSize());

            amazonS3Client.putObject(new PutObjectRequest(s3Bucket, resizedImageFilename,
                    mockMultipartFile.getInputStream(), objectMetadata));

            return amazonS3Client.getUrl(s3Bucket, resizedImageFilename).toString();
    }

    @Override
    public byte[] downloadImage(String imagePath) throws IOException {
        S3Object s3Object = amazonS3Client.getObject(s3Bucket, imagePath);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();

        return IOUtils.toByteArray(inputStream);
    }

    @Override
    public HttpHeaders buildHeaders(String resourcePath, byte[] data) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentLength(data.length);
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDisposition(ImageUtils.createContentDisposition(resourcePath));
        return headers;
    }

    @Override
    public String getMd5Hash(MultipartFile file) throws IOException, NoSuchAlgorithmException {
        InputStream is = file.getInputStream();
        MessageDigest md = MessageDigest.getInstance("MD5");
        DigestInputStream dis = new DigestInputStream(is, md);

        byte[] buffer = new byte[4096];
        while (dis.read(buffer) != -1) ;

        byte[] digest = md.digest();
        String md5Hash = DatatypeConverter.printHexBinary(digest).toUpperCase();

        return md5Hash;
    }

}
