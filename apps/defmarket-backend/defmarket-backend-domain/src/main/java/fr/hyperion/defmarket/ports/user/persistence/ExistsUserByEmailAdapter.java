package fr.hyperion.defmarket.ports.user.persistence;

public interface ExistsUserByEmailAdapter {
    boolean existsByEmail(String email);
}
