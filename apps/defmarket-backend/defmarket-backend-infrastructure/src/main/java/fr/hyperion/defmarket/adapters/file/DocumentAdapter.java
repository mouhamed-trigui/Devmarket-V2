package fr.hyperion.defmarket.adapters.file;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import fr.hyperion.defmarket.common.mappers.DocumentDBMapper;
import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.database.entity.DocumentDB;
import fr.hyperion.defmarket.database.repository.DocumentRepository;
import fr.hyperion.defmarket.ports.file.persistence.DeleteDocumentAdapter;
import fr.hyperion.defmarket.ports.file.persistence.DeleteFileAdapter;
import fr.hyperion.defmarket.ports.file.persistence.GetFileAdapter;
import fr.hyperion.defmarket.properties.DefmarketProperty;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.XSlf4j;

@XSlf4j
@Component
@RequiredArgsConstructor
public class DocumentAdapter implements GetFileAdapter, DeleteDocumentAdapter, DeleteFileAdapter {

    private static final String USER_DIR = "user.dir";
    private final DefmarketProperty defmarketProperty;
    private final DocumentRepository documentRepository;
    private final DocumentDBMapper documentDBMapper;

    public Document save(final Document document, final String path) {
        if (document == null) {
            return null;
        }

        final File sourceFile = new File(document.getPath());
        final File dir = new File(System.getProperty(USER_DIR) + File.separator + path);
        dir.mkdirs();
        final File logo = new File(dir.getPath() + File.separator + document.getName());
        try {
            Files.deleteIfExists(logo.toPath());
        } catch (final IOException e1) {
            log.error(e1.getMessage());
        }
        if (sourceFile.renameTo(logo)) {
            document.setPath(logo.getPath());
            try {
                Files.deleteIfExists(sourceFile.toPath().getParent());
            } catch (final IOException e) {
                log.error(e.getMessage());
            }
        } else {
            log.error("Document didn't move");
        }
        return document;

    }

    public Document saveAsPublic(final Document document, final String path) {
        return save(document, defmarketProperty.getFiles().getVisible() + path);
    }

    public Document saveAsPrivate(final Document document, final String path) {
        return save(document, defmarketProperty.getFiles().getSecured() + path);
    }

    @Override
    public File getAsFile(final Long fileId) {
        final DocumentDB documentDB = documentRepository.findById(fileId).orElseThrow();
        final File file = new File(documentDB.getPath());
        return file;
    }

    @Override
    public void deleteFile(final String path) {
        final File file = new File(path);
        try {
            Files.deleteIfExists(file.toPath());
        } catch (final IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    @Transactional
    public void deleteDocument(final Long fileId) {
        if (fileId == null || fileId < 20) {
            return;
        }
        documentRepository.deleteById(fileId);
    }

    @Transactional
    public DocumentDB updateDocument(final Document document, final DocumentDB target) {
        if (document == null) {
            return null;
        }
        if (target != null && target.getId() >= 20) {
            deleteFile(target.getPath());
            return documentDBMapper.toEntity(document, target);
        } else {
            final DocumentDB documentDB = documentDBMapper.toEntity(document);
            return documentRepository.save(documentDB);
        }
    }
}
