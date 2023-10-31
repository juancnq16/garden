export interface ChatMessage {
    senderId:string,
    recipientId:string,
    content:string,
    creationDate:string
    /**
     * private Integer id;
   private String senderId;
   private String recipientId;
   private String content;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creationDate")
    private Date creationDate;
     */
}