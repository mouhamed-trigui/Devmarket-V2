package fr.hyperion.defmarket.common.mapper;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import org.mapstruct.Mapper;
import org.springframework.web.multipart.MultipartFile;

import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.dto.response.DocumentResponse;

@Mapper
public interface DocumentMapper {
    default Document toDocument(final MultipartFile multipartFile) throws IOException {
        if (multipartFile == null) {
            return null;
        }

        final File dir = new File(System.getProperty("user.dir") + "/file/temp/" + UUID.randomUUID());
        dir.mkdirs();
        final File doc = new File(dir.getPath() + File.separator + multipartFile.getOriginalFilename());
        multipartFile.transferTo(doc);
        final Document document = new Document();
        document.setName(multipartFile.getOriginalFilename());
        document.setSize(multipartFile.getSize());
        document.setPath(doc.getPath());
        return document;
    }

    default DocumentResponse toDocumentResponse(final Document document) {
        if (document == null) {
            return null;
        }
        final DocumentResponse documentResponse = new DocumentResponse();
        documentResponse.id = document.getId();
        documentResponse.name = document.getName();
        return documentResponse;
    }
}
