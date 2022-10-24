package fr.hyperion.defmarket.service.file;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Base64;
import java.util.Objects;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import fr.hyperion.defmarket.ports.file.persistence.GetFileAdapter;
import fr.hyperion.defmarket.ports.file.usecase.DownloadFileUseCase;
import fr.hyperion.defmarket.ports.file.usecase.GetFileUseCase;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements GetFileUseCase, DownloadFileUseCase {
    private final GetFileAdapter getFileAdapter;

    @Override
    public byte[] getFile(final Long fileId) throws IOException {
        final File file = getFileAdapter.getAsFile(fileId);
        Assert.isTrue(file.getPath().contains("file" + File.separator + "public" + File.separator), "This file is not public");
        return Files.readAllBytes(file.toPath());
    }

    @Override
    public byte[] getPrivateFile(final Long fileId, final Long userId, final boolean isAdmin) throws IOException {
        final File file = getFileAdapter.getAsFile(fileId);
        final String path = file.getPath().replace(File.separator, "/");
        if (isAdmin || path.contains("/file/private/user_" + userId + "/") || path.contains("/file/public/")) {
            return Files.readAllBytes(file.toPath());
        }
        throw new AccessDeniedException("You are not allowed to access this file");
    }

    @Override
    public String getBase64(final Long fileId) throws IOException {
        final File file = getFileAdapter.getAsFile(fileId);
        final byte[] bytes = Files.readAllBytes(file.toPath());
        final String contentType = Files.probeContentType(new File(file.getPath()).toPath());
        final String base64 = Base64.getEncoder().encodeToString(bytes);
        return "data:" + contentType + ";base64," + base64;
    }

    @Override
    public HttpEntity<Resource> downloadFile(final Long fileId) throws IOException {
        final File file = getFileAdapter.getAsFile(fileId);
        final Resource resource = new FileSystemResource(file.getPath());
        final HttpHeaders header = new HttpHeaders();
        final String[] array = Objects.requireNonNull(resource.getFilename()).split("\\.");
        final MediaType mediaType = switch (array[1]) {
            case "jpg", "jpeg" -> MediaType.IMAGE_JPEG;
            case "html" -> MediaType.TEXT_HTML;
            default -> MediaType.APPLICATION_PDF;
        };
        header.setContentType(mediaType);
        header.setContentDisposition(ContentDisposition.attachment().filename(resource.getFilename()).build());
        header.setContentLength(resource.getFile().length());

        return new HttpEntity<>(resource, header);
    }
}
