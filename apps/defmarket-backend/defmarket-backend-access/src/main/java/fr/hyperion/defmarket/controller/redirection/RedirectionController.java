package fr.hyperion.defmarket.controller.redirection;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import fr.hyperion.defmarket.ports.redirection.useCase.GetLinkUseCase;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/redirection")
@RequiredArgsConstructor
public class RedirectionController {
    private final GetLinkUseCase getLinkUseCase;

    @GetMapping("/{key}")
    public RedirectView redirectWithUsingRedirectView(@RequestHeader(value = "User-Agent") final String userAgent,
                                                      final RedirectAttributes attributes,
                                                      @PathVariable final String key) {
        attributes.getFlashAttributes();

        return new RedirectView(getLinkUseCase.getLink(key, userAgent));
    }

}
