abstract class handler<T extends request<Tr>, Tr>{
    abstract handle(req : T) : Tr;
}