package fr.hyperion.defmarket.dto.response.user;

import java.util.List;

import fr.hyperion.defmarket.dto.response.company.CompanyResponse;

public class UserWithCompanyListResponse extends UserResponse {
    public List<CompanyResponse> companies;
}
