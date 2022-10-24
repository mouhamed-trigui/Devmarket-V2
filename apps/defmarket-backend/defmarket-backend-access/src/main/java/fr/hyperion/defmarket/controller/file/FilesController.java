package fr.hyperion.defmarket.controller.file;

import java.io.IOException;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.ports.file.usecase.DownloadFileUseCase;
import fr.hyperion.defmarket.ports.file.usecase.GetFileUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(AbstractController.APP_PREFIX + "/files")
@RequiredArgsConstructor
public class FilesController {

    private final GetFileUseCase getFileUseCase;
    private final DownloadFileUseCase downloadFileUseCase;

    @Operation(summary = "Get File ")
    @GetMapping(path = "/bytes/{fileId}", produces = {MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_PNG_VALUE,
        MediaType.IMAGE_JPEG_VALUE})
    public byte[] getFile(@PathVariable final Long fileId, @Parameter(hidden = true) @AuthenticationPrincipal final Jwt principal) throws IOException {
        final String roles = principal.getClaim("roles");
        final boolean isAdmin = roles.contains("PERM_ADMIN");
        return getFileUseCase.getPrivateFile(fileId, Long.parseLong(principal.getClaim("id")), isAdmin);
    }

    @Operation(summary = "Get File ")
    @GetMapping(path = "/public/bytes/{fileId}", produces = {MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_PNG_VALUE,
        MediaType.IMAGE_JPEG_VALUE})
    public byte[] getPublicFile(@PathVariable final Long fileId) throws IOException {
        return getFileUseCase.getFile(fileId);
    }

    @Operation(summary = "Download File")
    @GetMapping(path = "/resources/{fileId}")
    public HttpEntity<Resource> downloadFile(@PathVariable final Long fileId) throws IOException {
        return downloadFileUseCase.downloadFile(fileId);
    }

    @Operation(summary = "Download File")
    @GetMapping("/base64/{fileId}")
    public String getBase64(@PathVariable final Long fileId) throws IOException {
        return getFileUseCase.getBase64(fileId);
    }
}
