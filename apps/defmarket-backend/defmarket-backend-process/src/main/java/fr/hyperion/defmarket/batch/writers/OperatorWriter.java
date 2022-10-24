package fr.hyperion.defmarket.batch.writers;

import javax.sql.DataSource;

import org.springframework.batch.item.database.BeanPropertyItemSqlParameterSourceProvider;
import org.springframework.batch.item.database.JdbcBatchItemWriter;
import org.springframework.stereotype.Component;

import fr.hyperion.defmarket.database.entity.UserAccountDB;

@Component
public class OperatorWriter {

    private static final String QUERY_DELETE_INACTIVE_ACCOUNT = "DELETE FROM defmarket.user_account WHERE id = :id";

    public JdbcBatchItemWriter<UserAccountDB> inactiveUserWriter(final DataSource dataSource) {
        final JdbcBatchItemWriter<UserAccountDB> writer = new JdbcBatchItemWriter<>();
        writer.setDataSource(dataSource);
        writer.setSql(QUERY_DELETE_INACTIVE_ACCOUNT);
        writer.setItemSqlParameterSourceProvider(new BeanPropertyItemSqlParameterSourceProvider<>());
        writer.afterPropertiesSet();
        return writer;
    }
}
