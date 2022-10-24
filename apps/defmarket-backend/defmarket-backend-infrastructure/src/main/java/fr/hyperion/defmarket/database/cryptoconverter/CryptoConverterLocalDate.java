package fr.hyperion.defmarket.database.cryptoconverter;

import java.security.Key;
import java.time.LocalDate;
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
public class CryptoConverterLocalDate implements AttributeConverter<Object, String> {
    private final DefmarketProperty defmarketProperty;

    @Override
    public String convertToDatabaseColumn(final Object data) {
        final Key key = new SecretKeySpec(defmarketProperty.getSecurity().getDataConverter().getKey().getBytes(), defmarketProperty.getSecurity().getDataConverter().getEncryptionMode());
        try {
            if (data != null) {
                final Cipher cipher = Cipher.getInstance(defmarketProperty.getSecurity().getDataConverter().getAlgorithm());
                cipher.init(Cipher.ENCRYPT_MODE, key);
                final byte[] DataToCrypt = cipher.doFinal(data.toString().getBytes());
                return Base64.getEncoder().encodeToString(DataToCrypt);
            }
            return null;
        } catch (final Exception e) {
            throw new ConverterException("a problem has been appear while crypting data");
        }
    }


    @Override
    public LocalDate convertToEntityAttribute(final String dbData) {
        final Key key = new SecretKeySpec(defmarketProperty.getSecurity().getDataConverter().getKey().getBytes(), defmarketProperty.getSecurity().getDataConverter().getEncryptionMode());
        try {
            if (dbData != null) {
                final Cipher cipher = Cipher.getInstance(defmarketProperty.getSecurity().getDataConverter().getAlgorithm());
                cipher.init(Cipher.DECRYPT_MODE, key);
                final String DecryptedData = new String(cipher.doFinal(Base64.getDecoder().decode(dbData)));
                return LocalDate.parse(DecryptedData);
            }
            return null;
        } catch (final Exception e) {
            throw new ConverterException("a problem has been appear while decrypting data");
        }
    }
}
