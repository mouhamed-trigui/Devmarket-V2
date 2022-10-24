package fr.hyperion.defmarket.database.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import org.hibernate.search.engine.backend.types.Searchable;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class AddressDB {

    @Column(length = 500)
    private String street;

    @Column(length = 100)
    private String country;

    @FullTextField(searchable = Searchable.YES)
    @Column(length = 200)
    private String city;

    @Column(length = 10)
    private String zipCode;

    @Column(length = 100)
    private String department;

}
