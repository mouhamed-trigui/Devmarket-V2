package fr.hyperion.defmarket.controller.pro.timetable;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fr.hyperion.defmarket.controller.AbstractController;
import fr.hyperion.defmarket.controller.pro.timetable.mapper.TemporaryClosureMapper;
import fr.hyperion.defmarket.controller.pro.timetable.mapper.TimetableMapper;
import fr.hyperion.defmarket.data.store.TemporaryClosure;
import fr.hyperion.defmarket.data.timetable.Timetable;
import fr.hyperion.defmarket.dto.request.timetable.TimetableWithTemporaryClosureRequest;
import fr.hyperion.defmarket.dto.response.timetable.TimetableResponse;
import fr.hyperion.defmarket.dto.response.timetable.TimetableWithTemporaryClosureResponse;
import fr.hyperion.defmarket.ports.store.useCase.StoreUpdateTemporaryClosureUseCase;
import fr.hyperion.defmarket.ports.timetable.useCase.TimetableCRUDUseCase;
import fr.hyperion.defmarket.ports.timetable.useCase.getters.GetAllTimetableOfStoreUseCase;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(AbstractController.APP_PREFIX_PRO + "/store/{storeId}/timetable")
@RequiredArgsConstructor
@PreAuthorize("hasAuthority('PERM_STORE')")
public class TimetableController extends AbstractController {

	private final TimetableCRUDUseCase timetableCRUDUseCase;
	private final GetAllTimetableOfStoreUseCase getAllTimetableOfStoreUseCase;
	private final StoreUpdateTemporaryClosureUseCase storeUpdateTemporaryClosureUseCase;

	private final TimetableMapper timetableMapper;
	private final TemporaryClosureMapper temporaryClosureMapper;

	@PreAuthorize("hasAuthority('PERM_STORE_READ')")
	@Operation(summary = "Get all Timetable of a Store with the given storeId")
	@GetMapping
	public ResponseEntity<List<TimetableResponse>> getAll(@PathVariable final Long storeId) {
		final List<Timetable> timetables = getAllTimetableOfStoreUseCase.getAllTimetableOfStore(storeId);
		final List<TimetableResponse> timetableResponses = timetableMapper.toResponse(timetables);
		return ResponseEntity.ok(timetableResponses);
	}

	@PreAuthorize("hasAuthority('PERM_STORE_UPDATE')")
	@Operation(summary = "Add and update the Timetable and the TemporaryClosure of a Store with the given id")
	@PutMapping("/list")
	public ResponseEntity<TimetableWithTemporaryClosureResponse> crud(@PathVariable final Long storeId,
			@RequestBody @Valid final TimetableWithTemporaryClosureRequest timetableWithTemporaryClosureRequest) {
		List<Timetable> timetables = timetableMapper.toTimetable(timetableWithTemporaryClosureRequest.timetables);
		final TemporaryClosure temporaryClosure = temporaryClosureMapper
				.toData(timetableWithTemporaryClosureRequest.temporaryClosure);
		timetables = timetableCRUDUseCase.crud(storeId, timetables);
		final List<TimetableResponse> timetableResponses = timetableMapper.toResponse(timetables);
		storeUpdateTemporaryClosureUseCase.updateTemporaryClosure(storeId, temporaryClosure);

		final var timetableWithTemporaryClosureResponse = new TimetableWithTemporaryClosureResponse();
		timetableWithTemporaryClosureResponse.timetables = timetableResponses;
		timetableWithTemporaryClosureResponse.temporaryClosure = temporaryClosureMapper.toResponse(temporaryClosure);
		return ResponseEntity.ok(timetableWithTemporaryClosureResponse);
	}
}
