package fr.hyperion.defmarket.gateway.partner.sld.entity;

import java.io.File;
import java.io.IOException;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.dataformat.xml.XmlMapper;

import lombok.Data;

@Data
public class Article {
    private String articles_id;
    private String articles_code;
    private String articles_type;
    private String articles_genre;
    private String articles_sousgenre;

    private String articles_nom_manif;
    private String articles_statut_manif;
    private Instant articles_debut_manif;
    private Instant articles_fin_manif;

    private Instant articles_ouverture_vente;
    private int articles_nb_billets_max;
    private List<String> articles_lieux;

    private Double articles_prix_public;
    private Double articles_puht;
    private Double articles_puttc;
    // durée de validité du billet (à partir du premier jour d’utilisation)
    private int nb_jours;
    private String assurance;
    private String caution;
    private String articles_nom_fr;
    private String articles_nom_en;
    private String articles_descriptif;
    private String articles_detail_fr;
    private String articles_detail_en;
    private Boolean articles_plan_placement;
    private String articles_placement;
    private String articles_conditions_tarifaires;
    private String articles_url_rechargement;
    private String articles_url;
    private String articles_image;

    private Boolean articles_date_libre;
    private LocalDate articles_date_debut;
    private LocalDate articles_date_fin;
    private LocalTime articles_heure_debut;
    private LocalTime articles_heure_fin;

    private int articles_age_min;
    private int articles_age_max;

    private String articles_conditions_fr;
    private String articles_conditions_en;
    private String articles_infos_verite_fr;
    private String articles_infos_verite_en;

    private int articles_pack;
    private int articles_minimum_cmd;
    private int articles_multiple_cmd;

    private Boolean articles_nom_obligatoire;
    private Boolean articles_prenom_obligatoire;
    private Boolean articles_naissance_obligatoire;
    private Boolean articles_date_jour_obligatoire;

    public static Article fromXmlFile(final File xmlFile) {
        final XmlMapper xmlMapper = XmlMapper.builder().build();
        try {
            return xmlMapper.readValue(xmlFile, Article.class);
        } catch (final IOException e) {
            throw new RuntimeException(e);
        }
    }
}
