package fr.hyperion.defmarket.config;

import org.hibernate.search.backend.lucene.analysis.LuceneAnalysisConfigurationContext;
import org.hibernate.search.backend.lucene.analysis.LuceneAnalysisConfigurer;

public class LuceneAnalysisConfiguration implements LuceneAnalysisConfigurer {
    @Override
    public void configure(final LuceneAnalysisConfigurationContext context) {
        context.analyzer("ignoreCase").custom()
            .tokenizer("standard")
            .tokenFilter("lowercase")
            .tokenFilter("uppercase")
            .tokenFilter("asciiFolding");
    }
}
