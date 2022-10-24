package fr.hyperion.defmarket.interceptor;

import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.MDC;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.servlet.HandlerInterceptor;

public class LogginServiceInterceptor implements HandlerInterceptor {

    public static final String REQUEST_URL_MDC_KEY = "URL";
    public static final String REQUEST_IP_MDC_KEY = "IP";
    public static final String REQUEST_USER_ID_MDC_KEY = "USER_ID";

    @Override
    public boolean preHandle(final HttpServletRequest request, final HttpServletResponse response,
                             final Object handler) {
        final String fullUrl =
            request.getRequestURI() + Optional.ofNullable(request.getQueryString()).map(qs -> "?" + qs).orElse("");
        MDC.put(REQUEST_URL_MDC_KEY, fullUrl);
        MDC.put(REQUEST_IP_MDC_KEY, request.getRemoteAddr());
        if (request.getUserPrincipal() != null && request.getUserPrincipal().getName() != null) {
            final JwtAuthenticationToken principal = (JwtAuthenticationToken) request.getUserPrincipal();
            MDC.put(REQUEST_USER_ID_MDC_KEY, principal.getToken().getClaims().get("id").toString());
        }
        return true;
    }

    @Override
    public void afterCompletion(final HttpServletRequest request, final HttpServletResponse response,
                                final Object handler,
                                final Exception ex) {
        MDC.clear();
    }
}
