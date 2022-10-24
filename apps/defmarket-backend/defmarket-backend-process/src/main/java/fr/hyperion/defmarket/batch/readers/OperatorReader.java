package fr.hyperion.defmarket.batch.readers;

import javax.sql.DataSource;

import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.database.builder.JdbcCursorItemReaderBuilder;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.stereotype.Component;

import fr.hyperion.defmarket.database.entity.UserAccountDB;

@Component
public class OperatorReader {
    private static final String QUERY_FIND_INACTIVE_ACCOUNT = """
        SELECT id FROM defmarket.user_account ua
        WHERE ua.mail_validated=false AND
        extract(day from CURRENT_DATE::timestamp - ua.created_date::timestamp) > 15;""";

    public ItemReader<UserAccountDB> inactiveAccountReader(final DataSource dataSource) {
        return new JdbcCursorItemReaderBuilder<UserAccountDB>()
            .name("cursorInactiveAccountReader")
            .dataSource(dataSource)
            .sql(QUERY_FIND_INACTIVE_ACCOUNT)
            .rowMapper(new BeanPropertyRowMapper<>(UserAccountDB.class))
            .build();
    }
}
