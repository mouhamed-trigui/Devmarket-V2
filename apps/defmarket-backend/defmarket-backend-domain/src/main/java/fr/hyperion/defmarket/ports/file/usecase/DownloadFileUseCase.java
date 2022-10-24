package fr.hyperion.defmarket.ports.file.usecase;

import java.io.IOException;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;

public interface DownloadFileUseCase {
    HttpEntity<Resource> downloadFile(Long fileId) throws IOException;
}
