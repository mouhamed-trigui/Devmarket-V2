package fr.hyperion.defmarket.service.exceptions;
public class DefMarketRuntimeException extends RuntimeException {
        
    private static final long serialVersionUID = 5139059137220938191L;

    public DefMarketRuntimeException(String message) {
        super(message);
    }
    
    public DefMarketRuntimeException(Exception e) {
        super(e);
    }
}