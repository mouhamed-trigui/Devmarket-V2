package fr.hyperion.defmarket.ports.file.usecase;


import java.io.IOException;

public interface GetFileUseCase {
    byte[] getFile(Long fileId) throws IOException;

    byte[] getPrivateFile(Long fileId, Long userId, boolean isAdmin) throws IOException;

    String getBase64(Long fileId) throws IOException;
}
