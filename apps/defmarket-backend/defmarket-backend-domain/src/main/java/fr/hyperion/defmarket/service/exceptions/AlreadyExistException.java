package fr.hyperion.defmarket.service.exceptions;

import java.io.Serial;

public class AlreadyExistException extends ConflictException {

	@Serial
	private static final long serialVersionUID = 4392831508308282719L;

	public AlreadyExistException(String element) {
		super(element + " Already exist");
	}

}
