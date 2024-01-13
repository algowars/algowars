package com.algowars.backend.common.error;

import lombok.Value;

@Value
public class Message {

    String text;

    public static Message from(final String text) {
        return new Message(text);
    }
}