package services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import fr.hyperion.defmarket.data.job.JobRef;
import fr.hyperion.defmarket.ports.jobRef.persistance.GetAllJobRefAdapter;
import fr.hyperion.defmarket.service.job.JobRefServiceImpl;

@ExtendWith(MockitoExtension.class)
public class JobServiceTest {
    @InjectMocks
    private JobRefServiceImpl jobRefService;
    @Mock
    private GetAllJobRefAdapter getAllJobRefAdapter;
    List<JobRef> jobRefList;

    @BeforeEach
    public void setup() {
        System.out.println("Initializing");
        jobRefList = new ArrayList<>();


    }

    @Test
    void shouldGetAll() {
        when(getAllJobRefAdapter.getAllRef(null, null)).thenReturn(jobRefList);
        assertEquals(jobRefList, jobRefService.getAllRef(null, null));
    }

}
