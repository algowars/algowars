package com.algowars.backend;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
public class ApplicationIntegrationTest {

    @Autowired
    MockMvc api;

    // @Test
    // void shouldReturnStatusOkIfUserIsAnonymous() throws Exception {
    // api.perform(get("/data/actuator/health/liveness"))
    // .andExpect(status().isOk());
    // }

    // @Test
    // void shouldReturnUnauthorizedIfUserIsAnonymous()throws Exception {
    // api.perform(get("/data/machin"))
    // .andExpect(status().isUnauthorized());
    // }
}
