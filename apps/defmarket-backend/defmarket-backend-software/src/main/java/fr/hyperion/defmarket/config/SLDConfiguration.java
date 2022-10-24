package fr.hyperion.defmarket.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.tempuri.IPartenaire;
import org.tempuri.Partenaire;

@Configuration
public class SLDConfiguration {

	@Bean
	IPartenaire sldPartenaire() {
		return new Partenaire().getBasicHttpBindingIPartenaire();
	}

}