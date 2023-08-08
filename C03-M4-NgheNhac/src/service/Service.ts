export interface Service<T> {
    findAll();

    add(data);

    update(id, data);

    findById(id);

    delete(id);
}
