@TypeDefs({
    @TypeDef(name = "json", typeClass = JsonType.class)
})
package fr.hyperion.defmarket.database;


import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;

import com.vladmihalcea.hibernate.type.json.JsonType;
