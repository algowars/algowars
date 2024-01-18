package com.algowars.backend.evaluator;

import com.algowars.backend.evaluator.dtos.EvaluationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class EvaluatorService {

    @Value("${evaluator.url}")
    private String evaluatorUrl;

    @Qualifier("evaluatorRestTemplate")
    @Autowired
    private RestTemplate restTemplate;

    public EvaluationResponse execute(String code, String test) {
        EvaluationResponse response = restTemplate.postForObject(evaluatorUrl + "/submissions?base64_encoded=true&fields=*", code +  test, EvaluationResponse.class);

        return new EvaluationResponse();
    }

}
