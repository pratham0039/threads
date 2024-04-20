from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings
from sentence_transformers import SentenceTransformer
from langchain import HuggingFaceHub
from datasets import load_dataset
from langchain.chains import RetrievalQA
import numpy as np
import os
from PyPDF2 import  PdfReader
import getpass
import chainlit as cl



os.environ['HUGGING_FACE_API_KEY'] = "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"

path = "fepw1ps-merged.pdf"
loader = PyPDFLoader(path)
pages = loader.load()


splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=20)
docs  = splitter.split_documents(pages)

embeddings = HuggingFaceEmbeddings()
doc_search = Chroma.from_documents(docs, embeddings)

repo_id = "tiiuae/falcon-7b"
llm = HuggingFaceHub(huggingfacehub_api_token=os.environ['HUGGING_FACE_API_KEY'], repo_id=repo_id, model_kwargs={'temperature':0.2, 'max_length':1000})


@cl.on_chat_start
def main():
    retrieval_chain = RetrievalQA.from_chain_type(llm, chain_type='stuff', retriever=doc_search.as_retriever())
    cl.user_session.set("retrieval_chain", retrieval_chain)


@cl.on_message
async def main(message:str):
    retrieval_chain = cl.user_session.get("retrieval_chain")
    res = await retrieval_chain.acall(message, callbacks = [cl.AsyncLangChainCallbackHandler()])

    print(res)
    await cl.message(content=res["result"]).send()

