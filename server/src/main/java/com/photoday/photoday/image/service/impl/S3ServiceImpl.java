package com.photoday.photoday.image.service.impl;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.photoday.photoday.image.service.S3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.bind.DatatypeConverter;
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
