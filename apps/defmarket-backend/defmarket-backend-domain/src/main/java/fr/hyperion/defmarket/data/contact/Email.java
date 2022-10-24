package fr.hyperion.defmarket.data.contact;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Email {
  private Long id;
  private boolean primary;

  private String email;
}
