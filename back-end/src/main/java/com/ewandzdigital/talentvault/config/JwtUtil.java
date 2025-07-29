package com.ewandzdigital.talentvault.config;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET = "superSecretKey123456superSecretKey123456"; // 32+ bytes for HS256

    // Generate JWT
    public String generateToken(String email, Long userId) throws JOSEException {
        JWSSigner signer = new MACSigner(SECRET);

        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .claim("email", email)
                .claim("userId", userId)
                .issueTime(new Date())
                .expirationTime(new Date(System.currentTimeMillis() + 86400000)) // 1 day
                .build();

        SignedJWT signedJWT = new SignedJWT(
                new JWSHeader(JWSAlgorithm.HS256),
                claimsSet
        );

        signedJWT.sign(signer);

        return signedJWT.serialize();
    }

    // Validate JWT
    public boolean validateToken(String token) {
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            JWSVerifier verifier = new MACVerifier(SECRET);
            return signedJWT.verify(verifier) &&
                    new Date().before(signedJWT.getJWTClaimsSet().getExpirationTime());
        } catch (Exception e) {
            return false;
        }
    }

    // Extract userId
    public Long extractUserId(String token) throws ParseException {
        SignedJWT signedJWT = SignedJWT.parse(token);
        return signedJWT.getJWTClaimsSet().getLongClaim("userId");
    }

    // Extract email
    public String extractEmail(String token) throws ParseException {
        SignedJWT signedJWT = SignedJWT.parse(token);
        return signedJWT.getJWTClaimsSet().getStringClaim("email");
    }
}
