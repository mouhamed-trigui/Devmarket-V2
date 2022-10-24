package fr.hyperion.defmarket.data.user;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import fr.hyperion.defmarket.data.roles.CrudPermission;
import fr.hyperion.defmarket.data.roles.Role;
import fr.hyperion.defmarket.enumerated.GenderEnum;
import fr.hyperion.defmarket.enumerated.UserTypeEnum;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DefmarketUser implements UserDetails, CredentialsContainer {

    private static final long serialVersionUID = 5386031597455679901L;
    private static final String PERMISSION_PREFIX = "PERM_";

    private Long id;
    private String firstName;
    private String email;
    private GenderEnum gender;
    private String password;
    private String activationCode;
    private String resetPassToken;
    private Set<ExpoToken> expoTokens;
    private Instant deleteRequestDate;
    private UserTypeEnum userType;
    private List<Role> roles;

    private boolean mailValidated = false;
    private boolean deleted = false;
    private boolean validatedByAdmin = false;
    private boolean validatedInfoByAdmin = false;
    private boolean expired = false;
    private boolean blocked = false;
    private boolean moreInfoRequestedByAdmin = false;
    private boolean pushNotificationActive = false;
    @Override
    public void eraseCredentials() {
        password = null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<CrudPermission> crudPermissions = roles.stream().flatMap(role -> role.getPermissions().stream()).collect(Collectors.toSet());
        if (blocked) {
            crudPermissions = crudPermissions.stream().filter(crudPermission -> crudPermission.getName().equals("CONTACT")).collect(Collectors.toSet());
        }

        final List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        crudPermissions.forEach(crudPermission -> {
            String permissionPrefix = PERMISSION_PREFIX;
            if (crudPermission.isAdmin()) {
                permissionPrefix = permissionPrefix + "ADMIN_";
            }

            authorities.add(new SimpleGrantedAuthority(permissionPrefix + crudPermission.getName()));
            if (crudPermission.isCreate()) {
                authorities.add(new SimpleGrantedAuthority(permissionPrefix + crudPermission.getName() + "_CREATE"));
            }
            if (crudPermission.isRead()) {
                authorities.add(new SimpleGrantedAuthority(permissionPrefix + crudPermission.getName() + "_READ"));
            }
            if (crudPermission.isUpdate()) {
                authorities.add(new SimpleGrantedAuthority(permissionPrefix + crudPermission.getName() + "_UPDATE"));
            }
            if (crudPermission.isDelete()) {
                authorities.add(new SimpleGrantedAuthority(permissionPrefix + crudPermission.getName() + "_DELETE"));
            }
        });
        return authorities;
    }

    public String getAuthoritiesAsString() {
        if (getAuthorities() == null) {
            return "";
        }
        return getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(" "));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return !expired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return mailValidated;
    }
}
