package fr.hyperion.defmarket.database.cryptoconverter;

import java.security.Key;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import org.springframework.stereotype.Component;

import fr.hyperion.defmarket.properties.DefmarketProperty;
import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
@Converter
public class CryptoConverterString implements AttributeConverter<String, String> {

    private final DefmarketProperty defmarketProperty;

    @Override
    public String convertToDatabaseColumn(final String data) {
        final Key key = new SecretKeySpec(defmarketProperty.getSecurity().getDataConverter().getKey().getBytes(), defmarketProperty.getSecurity().getDataConverter().getEncryptionMode());
        try {
            if (data != null) {
                final Cipher cipher = Cipher.getInstance(defmarketProperty.getSecurity().getDataConverter().getAlgorithm());
                cipher.init(Cipher.ENCRYPT_MODE, key);
                final byte[] DataToCrypt = cipher.doFinal(data.getBytes());
                return Base64.getEncoder().encodeToString(DataToCrypt);
            }
            return null;
        } catch (final Exception e) {
            throw new ConverterException("a problem has been appear while crypting data");
        }
    }

    @Override
    public String convertToEntityAttribute(final String dbData) {
        final Key key = new SecretKeySpec(defmarketProperty.getSecurity().getDataConverter().getKey().getBytes(), defmarketProperty.getSecurity().getDataConverter().getEncryptionMode());
        try {
            if (dbData != null) {
                final Cipher cipher = Cipher.getInstance(defmarketProperty.getSecurity().getDataConverter().getAlgorithm());
                cipher.init(Cipher.DECRYPT_MODE, key);
                final String DecryptedData = new String(cipher.doFinal(Base64.getDecoder().decode(dbData)));
                return DecryptedData;
            }
            return null;
        } catch (final Exception e) {
            throw new ConverterException("a problem has been appear while decrypting data");
        }
    }
}
