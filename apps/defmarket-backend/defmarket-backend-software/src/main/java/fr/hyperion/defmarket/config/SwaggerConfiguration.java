package fr.hyperion.defmarket.config;

import static org.springdoc.core.SpringDocUtils.getConfig;

import org.apache.commons.lang3.StringUtils;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.domain.Pageable;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;


@Configuration
@Profile("!prod")
public class SwaggerConfiguration {
    private final String moduleName = "Defmarket";
    private final String apiVersion = "Api Version 2";

    static {
        getConfig().replaceParameterObjectWithClass(org.springframework.data.domain.Pageable.class, Pageable.class)
            .replaceParameterObjectWithClass(org.springframework.data.domain.PageRequest.class, Pageable.class);
    }

    @Bean
    public GroupedOpenApi loginApi() {

        return GroupedOpenApi.builder()
            .group("Login API")
            .pathsToMatch("/api/auth/**")

            .build();

    }

    @Bean
    public GroupedOpenApi api() {

        return GroupedOpenApi.builder()
            .group("API")
            .pathsToMatch("/api/**")
            .pathsToExclude("/api/auth/**")
            .build();
    }

    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "bearerAuth";
        final String apiTitle = String.format("%s API", StringUtils.capitalize(moduleName));
        return new OpenAPI()

            .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
            .components(
                new Components()
                    .addSecuritySchemes(securitySchemeName,
                        new SecurityScheme()

                            .name(securitySchemeName)
                            .type(SecurityScheme.Type.HTTP)
                            .scheme("bearer")
                            .bearerFormat("JWT")
                    )
            )
            .info(new Info().title(apiTitle).version(apiVersion));
    }


}



