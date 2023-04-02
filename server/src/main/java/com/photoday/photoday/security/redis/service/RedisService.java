package com.photoday.photoday.security.redis.service;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class RedisService {
    private final RedisTemplate redisTemplate;

    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int redisMinutes;

    public void setValues(String key, String value) {
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        values.set(key, value, Duration.ofMinutes(redisMinutes));
    }

    public String getValues(String key) {
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        return values.get(key);
    }

    public void deleteValues(String key) {
        redisTemplate.delete(key);
    }

}
