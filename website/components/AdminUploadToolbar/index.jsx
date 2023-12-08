import React from 'react'
import Link from "next/link"
import Image from "next/image"
import CSVImport from './CSVImport'
import OCRUpload from './OCRUpload'

function UploaderToolbar() {

    return (
        <div className="w-full h-[20%] flex gap-10 justify-end">
            
            <CSVImport/>

            <Link 
                className="text-[0.75rem] hover:shadow-md  active:opacity-80 flex flex-col bg-secondary rounded-xl text-main justify-center items-center w-[8%] gap-2 h-[60%] "
                id="Assessment"
                href="/candidates.csv">
                <Image
                    alt="assessment"
                    src={"/template.svg"}
                    height={20}
                    width={20}
                    className="w-[1.5rem] "
                />
                <p>CSV Template</p>
            </Link>

            <OCRUpload/>
        </div>
    )
}

export default UploaderToolbar