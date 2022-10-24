package fr.hyperion.defmarket.gateway.partner.sld;

import org.springframework.stereotype.Component;
import org.tempuri.IPartenaire;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Component
@AllArgsConstructor
public class SLDPartnerGateway {

	private IPartenaire sldPartenaire;

	// TODO To remove once you understand the principle
	public void testApi() {
		log.info("TestAPI : {}", sldPartenaire.testAPI());
	}

}
