package com.photoday.photoday.security.filter;

import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.excpetion.ExceptionCode;
import com.photoday.photoday.security.jwt.JwtProvider;
import com.photoday.photoday.security.principaldetails.PrincipalDetailsService;
import com.photoday.photoday.security.utils.CustomAuthorityUtils;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.service.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider;
    private final CustomAuthorityUtils customAuthorityUtils;
    private final PrincipalDetailsService principalDetailsService;
    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = request.getHeader("Authorization");
        String requestURI = request.getRequestURI();

        try {
            if (!Objects.isNull(accessToken) && accessToken.startsWith("Bearer") || requestURI.equals("/api/auth/reissue")) {
                if (requestURI.equals("/api/auth/reissue")) {
                    String refreshToken = jwtProvider.getRefreshTokenFromRequest(request);
                    jwtProvider.verifyRefreshToken(refreshToken);
                    setAuthenticationForReissue(refreshToken);
                } else {
                    Map<String, Object> claims = verifyJws(request);
                    String username = (String) claims.get("username");
                    User user = userService.findUserByEmail(username);

                    checkUserStatus(user); //TODO 지금 이 부분 안 먹는 듯? 로그인 됨.

                    setAuthenticationToContext(claims);
                }
            }
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtProvider.encodeBase64SecretKey(jwtProvider.getSecretKey());
        Map<String, Object> claims = jwtProvider.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username");
        List<GrantedAuthority> authorities = customAuthorityUtils.createAuthorities((List)claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private void setAuthenticationForReissue(String refreshToken) {
        String subject = jwtProvider.getSubject(refreshToken);
        UserDetails userDetails = principalDetailsService.loadUserByUsername(subject);

        Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private void checkUserStatus(User user) {
        if(user.getStatus().equals(User.UserStatus.USER_BANED)) {
            throw new CustomException(ExceptionCode.ACCOUNT_SUSPENDED); //TODO exception 종류 변경 ~
        }
    }
}
