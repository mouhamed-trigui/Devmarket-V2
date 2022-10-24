package fr.hyperion.defmarket.database.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import fr.hyperion.defmarket.enumerated.company.StoreTypeEnum;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "store_category", schema = "defmarket")
public class StoreCategoryDB extends AbstractEntity {
    @Id
    @SequenceGenerator(name = "store_category_seq", allocationSize = INCREMENT_BY)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "store_category_seq")
    private Long id;

    @NotNull
    @NotBlank
    private String name;

    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    private StoreTypeEnum storeType;

    @OneToMany(mappedBy = "storeCategory")
    private List<StoreDB> stores;
}
