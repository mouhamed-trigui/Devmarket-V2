package fr.hyperion.defmarket.service.exceptions;

import java.io.Serial;

public class MoveAttemptToSelfException extends ConflictException {

	@Serial
	private static final long serialVersionUID = -2242306497806774327L;

	public MoveAttemptToSelfException() {
		super("You may not move a node to itself");
	}

}
