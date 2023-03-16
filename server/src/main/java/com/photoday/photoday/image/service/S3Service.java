package com.photoday.photoday.image.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.imaging.jpeg.JpegMetadataReader;
import com.drew.lang.GeoLocation;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.exif.ExifIFD0Directory;
import com.drew.metadata.exif.GpsDirectory;
import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.excpetion.ExceptionCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.metadata.IIOMetadata;
import javax.imageio.metadata.IIOMetadataNode;
import javax.imageio.stream.ImageInputStream;
import javax.xml.bind.DatatypeConverter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.DigestInputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3Service {
    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String s3Bucket;

    public String saveImage(MultipartFile multipartFile) throws IOException, ImageProcessingException, NoSuchAlgorithmException {
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

//    public void getImageMetadata(MultipartFile multipartFile) throws IOException {
//        try {
//            Metadata metadata = ImageMetadataReader.readMetadata(multipartFile.getInputStream());
//            Directory directory = metadata.getFirstDirectoryOfType(ExifIFD0Directory.class);
//
//            if (directory != null && directory.containsTag(ExifIFD0Directory.TAG_MAKE) && directory.containsTag(ExifIFD0Directory.TAG_MODEL)) {
//                String make = directory.getString(ExifIFD0Directory.TAG_MAKE);
//                String model = directory.getString(ExifIFD0Directory.TAG_MODEL);
//                System.out.println("Camera make: " + make);
//                System.out.println("Camera model: " + model);
//            }
//
//            GpsDirectory gpsDirectory = metadata.getFirstDirectoryOfType(GpsDirectory.class);
//
//            if (gpsDirectory != null && gpsDirectory.getGeoLocation() != null) {
//                GeoLocation geoLocation = gpsDirectory.getGeoLocation();
//                System.out.println("Latitude: " + geoLocation.getLatitude());
//                System.out.println("Longitude: " + geoLocation.getLongitude());
//            }
//        } catch (ImageProcessingException | IOException e) {
//            e.printStackTrace();
//        }
//    }

    public String getMd5Hash(MultipartFile file) throws IOException, NoSuchAlgorithmException {
        InputStream is = file.getInputStream();
        MessageDigest md = MessageDigest.getInstance("MD5");
        DigestInputStream dis = new DigestInputStream(is, md);

        byte[] buffer = new byte[4096];
        while (dis.read(buffer) != -1);

        byte[] digest = md.digest();
        String md5Hash = DatatypeConverter.printHexBinary(digest).toUpperCase();

        return md5Hash;
    }

}
