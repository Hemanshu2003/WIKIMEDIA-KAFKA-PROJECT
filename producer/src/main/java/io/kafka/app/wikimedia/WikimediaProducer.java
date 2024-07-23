package io.kafka.app.wikimedia;

import com.launchdarkly.eventsource.EventSource;
import com.launchdarkly.eventsource.background.BackgroundEventHandler;
import com.launchdarkly.eventsource.background.BackgroundEventSource;
import org.apache.kafka.clients.producer.KafkaProducer;

import org.apache.kafka.common.serialization.StringSerializer;


import java.net.URI;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

import static org.apache.kafka.clients.CommonClientConfigs.BOOTSTRAP_SERVERS_CONFIG;
import static org.apache.kafka.clients.CommonClientConfigs.SECURITY_PROTOCOL_CONFIG;
import static org.apache.kafka.clients.producer.ProducerConfig.*;
import static org.apache.kafka.common.config.SaslConfigs.SASL_JAAS_CONFIG;
import static org.apache.kafka.common.config.SaslConfigs.SASL_MECHANISM;

public class WikimediaProducer {

    public static void main(String[] args) {

        // Producer Properties

        Properties properties = new Properties() {{
            // connect to confluent platform
            put(BOOTSTRAP_SERVERS_CONFIG, "<---BOOTSTRAP_SERVERS--->");
            put(SASL_JAAS_CONFIG, "<------SASL_JAAS_CONFIG------>");
            put(ACKS_CONFIG,"all");
            put(SECURITY_PROTOCOL_CONFIG,"SASL_SSL");
            put(SASL_MECHANISM,"PLAIN");
        }};

        // set producer props
        properties.setProperty(KEY_SERIALIZER_CLASS_CONFIG , StringSerializer.class.getName());
        properties.setProperty(VALUE_SERIALIZER_CLASS_CONFIG , StringSerializer.class.getName());

        // high producer Configs

        properties.setProperty(COMPRESSION_TYPE_CONFIG, "snappy");
        properties.setProperty(LINGER_MS_CONFIG, "20");
        properties.setProperty(BATCH_SIZE_CONFIG, Integer.toString(32 * 1024));



        // Create a Producer

        KafkaProducer<String ,String > producer = new KafkaProducer<>(properties);

        String topic = "wikimedia-recent-change";

        BackgroundEventHandler eventHandler = new WikimediaChangeHandler(producer , topic);


        String url = "https://stream.wikimedia.org/v2/stream/recentchange";

        EventSource.Builder eventBuilder = new EventSource.Builder(URI.create(url));

        BackgroundEventSource.Builder builder = new BackgroundEventSource.Builder(eventHandler , eventBuilder);

        BackgroundEventSource eventSource = builder.build();


//start the producer in another thread
        eventSource.start();

        // we produce for 10min then block code

        try {
            TimeUnit.MINUTES.sleep(10);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }

    }
}
