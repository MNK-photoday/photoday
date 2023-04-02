package com.photoday.photoday.security.principaldetails;

import com.photoday.photoday.excpetion.CustomException;
import com.photoday.photoday.security.utils.CustomAuthorityUtils;
import com.photoday.photoday.user.entity.User;
import com.photoday.photoday.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

import static com.photoday.photoday.excpetion.ExceptionCode.USER_NOT_FOUND;

@Component
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {
    private final UserRepository userRepository;
    private final CustomAuthorityUtils customAuthorityUtils;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByEmail(username);
        User findUser = optionalUser.orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        return new PrincipalDetails(findUser);
    }

    private final class PrincipalDetails extends User implements UserDetails {
        PrincipalDetails(User user) {
            setUserId(user.getUserId());
            setEmail(user.getEmail());
            setPassword(user.getPassword());
            setRoles(user.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return customAuthorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }

}
