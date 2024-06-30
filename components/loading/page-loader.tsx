import styles from './page-loader.module.css'

export default function PageLoader() {
   return (
      <div className={`${styles.box} w-fit rounded-md p-1`}>
         <div className="h-20 w-20 rounded-md bg-black md:h-28 md:w-28 xl:h-36 xl:w-36"></div>
      </div>
   )
}
