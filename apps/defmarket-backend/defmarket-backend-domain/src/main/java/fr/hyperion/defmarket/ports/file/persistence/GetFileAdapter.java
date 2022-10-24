package fr.hyperion.defmarket.ports.file.persistence;


import java.io.File;

public interface GetFileAdapter {
    File getAsFile(Long fileId);
}
