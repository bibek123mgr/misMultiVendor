import { useEffect } from "react";
import AddCategory from "../components/AddCategory";
import Categories from "../components/Categories";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchCategories } from "../redux/categorySlice";

const Category = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCategories()); // Fetch products from API
    }, [dispatch]);

    const { categories }: { categories: any } = useAppSelector((store) => store.category.data);

    return (
        <div className='py-4 w-full'>
            <AddCategory />
            <Categories categories={categories} />
        </div>
    );
};

export default Category;
