package fr.hyperion.defmarket.controller.pro.announcement;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fr.hyperion.defmarket.common.mapper.DocumentMapper;
import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.controller.pro.announcement.mapper.AnnouncementMapper;
import fr.hyperion.defmarket.data.announcement.Announcement;
import fr.hyperion.defmarket.data.document.Document;
import fr.hyperion.defmarket.dto.request.announcement.AnnouncementCreationRequest;
import fr.hyperion.defmarket.dto.request.announcement.AnnouncementUpdateRequest;
import fr.hyperion.defmarket.dto.response.announcement.AnnouncementResponse;
import fr.hyperion.defmarket.ports.announcement.useCase.CreateAnnouncementUseCase;
import fr.hyperion.defmarket.ports.announcement.useCase.DeleteAnnouncementUseCase;
import fr.hyperion.defmarket.ports.announcement.useCase.UpadateAnnouncementUseCase;
import fr.hyperion.defmarket.ports.announcement.useCase.UpdateImageAnnouncementUseCase;
import fr.hyperion.defmarket.ports.announcement.useCase.getters.GetAllAnnouncementUseCase;
import fr.hyperion.defmarket.ports.announcement.useCase.getters.GetOneAnnouncementUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(AbstractController.APP_PREFIX_PRO + "/announcement")
@RequiredArgsConstructor
public class AnnouncementController extends AbstractController {
    private final CreateAnnouncementUseCase createAnnouncementUseCase;
    private final DeleteAnnouncementUseCase deleteAnnouncementUseCase;
    private final GetOneAnnouncementUseCase getOneAnnouncementUseCase;
    private final GetAllAnnouncementUseCase getAllAnnouncementUseCase;
    private final UpadateAnnouncementUseCase upadateAnnouncementUseCase;
    private final UpdateImageAnnouncementUseCase updateImageAnnouncementUseCase;

    private final AnnouncementMapper announcementMapper;
    private final DocumentMapper documentMapper;

    @Operation(summary = "Create Announcement")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AnnouncementResponse> createAnnouncement(@RequestPart("announcement") @Valid final AnnouncementCreationRequest announcementCreationRequest,
                                                                   @RequestPart(value = "image", required = false) final MultipartFile image, final BindingResult result) throws IOException {
        checkBindingResult(result);
        final Document imageFile = documentMapper.toDocument(image);
        Announcement announcement = announcementMapper.toEntity(announcementCreationRequest, imageFile);
        announcement = createAnnouncementUseCase.create(announcement);
        final AnnouncementResponse announcementResponse = announcementMapper.toResponse(announcement);
        return ResponseEntity.ok(announcementResponse);
    }

    @Operation(summary = "Delete Announcement")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable final Long id, @Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        deleteAnnouncementUseCase.delete(id);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Get Announcement By Announcement Id")
    @GetMapping("/{id}")
    public ResponseEntity<AnnouncementResponse> getById(
        @PathVariable("id") final Long id) {
        final Announcement announcement = getOneAnnouncementUseCase.getOne(id);
        final AnnouncementResponse announcementResponse = announcementMapper.toResponse(announcement);
        return ResponseEntity.ok(announcementResponse);

    }

    @Operation(summary = "Get All Announcement ")
    @GetMapping
    public ResponseEntity<List<AnnouncementResponse>> getAll(@Parameter(hidden = true) @AuthenticationPrincipal final Jwt jwt) {
        final List<Announcement> allAnnouncements = getAllAnnouncementUseCase.getAll();
        final List<AnnouncementResponse> announcementResponses = announcementMapper.toResponse(allAnnouncements);
        return ResponseEntity.ok(announcementResponses);

    }

    @Operation(summary = "Update Announcement ")
    @PutMapping("/{id}")
    public ResponseEntity<AnnouncementResponse> update(@RequestBody @Valid final AnnouncementUpdateRequest announcementUpdateRequest, @PathVariable("id") final Long id,
                                                       final BindingResult result) {
        checkBindingResult(result);
        Announcement announcement = announcementMapper.toUpdate(announcementUpdateRequest);
        announcement = upadateAnnouncementUseCase.update(announcement, id);
        final AnnouncementResponse announcementResponse = announcementMapper.toResponse(announcement);
        return ResponseEntity.ok(announcementResponse);

    }

    @Operation(summary = "Update Logo Announcement ")
    @PatchMapping(path = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AnnouncementResponse> updateLogo(@PathVariable("id") final Long id,
                                                           @RequestPart(value = "image", required = false) final MultipartFile image) throws IOException {
        final Announcement announcement = updateImageAnnouncementUseCase.updateImage(documentMapper.toDocument(image), id);
        final AnnouncementResponse announcementResponse = announcementMapper.toResponse(announcement);
        return ResponseEntity.ok(announcementResponse);
    }

}
