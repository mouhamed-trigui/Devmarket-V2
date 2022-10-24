package fr.hyperion.defmarket.config;

import java.io.IOException;
import java.io.InputStream;
import java.security.Key;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.UnrecoverableKeyException;
import java.security.cert.Certificate;
import java.security.cert.CertificateException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

import fr.hyperion.defmarket.properties.DefmarketProperty;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Configuration
@RequiredArgsConstructor
public class JwtConfiguration {

  private final DefmarketProperty defmarketProperty;

  @Bean
  public KeyStore keyStore() {
    final String keystoreLocation = defmarketProperty.getSecurity().getJwt().getKeystoreLocation();
    final String keystorePassword = defmarketProperty.getSecurity().getJwt().getKeystorePassword();
    try {
      final KeyStore keyStore = KeyStore.getInstance(KeyStore.getDefaultType());
      final InputStream resourceAsStream = Thread.currentThread().getContextClassLoader().getResourceAsStream(keystoreLocation);
      keyStore.load(resourceAsStream, keystorePassword.toCharArray());
      return keyStore;
    } catch (final IOException | CertificateException | NoSuchAlgorithmException | KeyStoreException e) {
      log.error("Unable to load keystore: {}", keystoreLocation, e);
    }

    throw new IllegalArgumentException("Unable to load keystore");
  }

  @Bean
  public RSAPrivateKey jwtSigningKey(final KeyStore keyStore) {
    final String keyAlias = defmarketProperty.getSecurity().getJwt().getKeyAlias();
    final String privateKeyPassphrase = defmarketProperty.getSecurity().getJwt().getPrivateKeyPassphrase();
    try {
        final Key key = keyStore.getKey(keyAlias, privateKeyPassphrase.toCharArray());
        if (key instanceof RSAPrivateKey rsaPrivateKey) {
            return rsaPrivateKey;
        }
    } catch (final UnrecoverableKeyException | NoSuchAlgorithmException | KeyStoreException e) {
      final String keystoreLocation = defmarketProperty.getSecurity().getJwt().getKeystoreLocation();
      log.error("Unable to load private key from keystore: {}", keystoreLocation, e);
    }

    throw new IllegalArgumentException("Unable to load private key");
  }

  @Bean
  public RSAPublicKey jwtValidationKey(final KeyStore keyStore) {
    try {
        final String keyAlias = defmarketProperty.getSecurity().getJwt().getKeyAlias();
        final Certificate certificate = keyStore.getCertificate(keyAlias);
        final PublicKey publicKey = certificate.getPublicKey();

        if (publicKey instanceof RSAPublicKey rsaPublicKey) {
            return rsaPublicKey;
        }
    } catch (final KeyStoreException e) {
      final String keystoreLocation = defmarketProperty.getSecurity().getJwt().getKeystoreLocation();
      log.error("Unable to load private key from keystore: {}", keystoreLocation, e);
    }

    throw new IllegalArgumentException("Unable to load RSA public key");
  }

  @Bean
  public JwtDecoder jwtDecoder(final RSAPublicKey rsaPublicKey) {
    return NimbusJwtDecoder.withPublicKey(rsaPublicKey).build();
  }
}
