package fr.hyperion.defmarket.service.exceptions;

public class CyclicalTreeStructureException extends RuntimeException {

	private static final long serialVersionUID = -3058647045388948390L;
	
	public CyclicalTreeStructureException() {
		super("You may not move a node to one of its descendants");
	}
	
}
