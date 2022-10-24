package fr.hyperion.defmarket.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import fr.hyperion.defmarket.enumerated.JwtEnum;
import fr.hyperion.defmarket.interceptor.LogginServiceInterceptor;

@Configuration
public class ApplicationSecurityConfiguration {

    private static final String AUTHORITIES_CLAIM_NAME = "roles";

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public ThreadLocal<String> authTokenLocal() {
        return new ThreadLocal<String>();
    }


    @Bean
    public SecurityFilterChain filterChain(final HttpSecurity http) throws Exception {
        http.cors().and().httpBasic().disable().csrf().disable()
            .headers().frameOptions().disable()
            .and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests(configure -> configure
                .antMatchers("/api/version").permitAll()
                .antMatchers("/api/auth/login").permitAll()
                .antMatchers("/h2-console/**").permitAll()
                .antMatchers("/redirection/**").permitAll()
                .antMatchers("/v3/api-docs/**", "/swagger-ui/**", "/configuration/ui", "/swagger-resources/**",
                    "/configuration/**", "/webjars/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/pro/register", "/api/auth/forgot-password", "/api/auth/exists-by" +
                    "-email").permitAll()
                .antMatchers(HttpMethod.GET, "/api/files/public/bytes/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/auth/resend-validate-email").permitAll()
               .antMatchers(HttpMethod.POST, "/api/customer/conciergerie").permitAll()
               .antMatchers(HttpMethod.POST, "/api/auth/validate-email").hasAuthority(JwtEnum.JWT_VALIDATE_EMAIL.toString())
               .antMatchers(HttpMethod.PATCH, "/api/pro/validate-update-email").hasAuthority(JwtEnum.JWT_CHANGE_EMAIL.toString())
               .antMatchers(HttpMethod.POST, "/api/auth/refresh-token").hasAuthority(JwtEnum.JWT_REFRESH_TOKEN.toString())
               .antMatchers(HttpMethod.PATCH, "/api/auth/confirm-new-password").hasAuthority(JwtEnum.JWT_FORGOT_PASSWORD.toString())
               .antMatchers(HttpMethod.PATCH, "/api/pro/me/update-password").hasAnyAuthority(JwtEnum.JWT_ACCESS_TOKEN.toString(), JwtEnum.JWT_CHANGE_PASSWORD.toString())
               .anyRequest().hasAuthority(JwtEnum.JWT_ACCESS_TOKEN.toString())
           )
           .oauth2ResourceServer()
           .jwt()
           .jwtAuthenticationConverter(authenticationConverter());
        return http.build();
    }


    private JwtAuthenticationConverter authenticationConverter() {
        final JwtGrantedAuthoritiesConverter authoritiesConverter = new JwtGrantedAuthoritiesConverter();
        authoritiesConverter.setAuthorityPrefix("");
        authoritiesConverter.setAuthoritiesClaimName(AUTHORITIES_CLAIM_NAME);

        final JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(authoritiesConverter);
        return converter;
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(final CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedMethods("GET", "DELETE", "POST", "PUT", "PATCH", "OPTIONS");
            }

            @Override
            public void addInterceptors(final InterceptorRegistry registry) {
                registry.addInterceptor(new LogginServiceInterceptor());
            }
        };

    }

}
