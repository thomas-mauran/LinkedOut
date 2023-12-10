package com.linkedout.messaging.utils

import com.linkedout.proto.models.MessageOuterClass.Message

enum class MessageDirection {
    ToEmployer,
    ToSeasonworker;

    companion object {
        fun fromProto(value: Message.Direction): MessageDirection {
            return when (value) {
                Message.Direction.ToEmployer -> ToEmployer
                Message.Direction.ToSeasonworker -> ToSeasonworker
                else -> throw Exception("Invalid message direction")
            }
        }

        fun toProto(value: MessageDirection): Message.Direction {
            return when (value) {
                ToEmployer -> Message.Direction.ToEmployer
                ToSeasonworker -> Message.Direction.ToSeasonworker
            }
        }
    }
}
