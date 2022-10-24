package fr.hyperion.defmarket;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.envers.repository.support.EnversRevisionRepositoryFactoryBean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import fr.hyperion.defmarket.properties.DefmarketProperty;
import net.javacrumbs.shedlock.spring.annotation.EnableSchedulerLock;

@EnableAsync

@EnableCaching

@EnableScheduling
@EnableSchedulerLock(defaultLockAtMostFor = "PT5H")

@EnableJpaRepositories(repositoryFactoryBeanClass = EnversRevisionRepositoryFactoryBean.class)
@EnableTransactionManagement

@EnableGlobalMethodSecurity(prePostEnabled = true)

@EnableBatchProcessing

@SpringBootApplication
@EnableConfigurationProperties(DefmarketProperty.class)
public class DefmarketApplication {

	public static void main(final String[] args) {
		SpringApplication.run(DefmarketApplication.class, args);
	}

}
