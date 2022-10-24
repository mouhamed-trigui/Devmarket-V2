package fr.hyperion.defmarket.service.exceptions;

import java.io.Serial;

public abstract class ConflictException extends RuntimeException {

	@Serial
	private static final long serialVersionUID = 4940210181738526488L;

	protected ConflictException(String msg) {
		super(msg);
	}

}